const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const { validateContentInput } = require("../Auth/validators");
const checkAuth = require("../Auth/check-auth");
const Draft = require("./Models/DraftModel");
const { findUser } = require("../Auth/AuthControl");
const { isAuthrized } = require("../Auth/Autherization");
const { ArticleControl } = require("./ArticlesControl");

module.exports.DraftControl = {
  createDraft: async (
    _,
    {
      id,
      contentInput: {
        title,
        body,
        // , structerdBody
      },
    },
    context
  ) => {
    const { valid, errors } = validateContentInput(
      title,
      body
      //  structerdBody
    );
    //If user not auth
    const auth = checkAuth(context);

    if (auth.id == id) {
      //Validators
      const userDraft = await findUser(_, { id });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const draftName = title;
      const draftBody = body;
      const draftAuthorId = userDraft.id;
      const newDraft = new Draft({
        draftName,
        draftBody,
        draftAuthorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const res = await newDraft.save();
      return {
        ...res._doc,
        id: res._id,
        draftAuther: userDraft,
      };
    } else {
      throw new Error("User Must Be Authorized");
    }
  },

  getDrafts: async (_, { id }, context) => {
    const auth = checkAuth(context);

    if (auth.id == id) {
      try {
        const drafts = [];
        const draftsDocs = await Draft.find({ draftAuthorId: id });
        const draftAuther = await findUser(_, { id: id });
        draftsDocs.map((v) => {
          drafts.push({
            id: v._id,
            draftAuther,
            ...v._doc,
          });
        });
        return drafts;
      } catch (error) {
        throw new Error("Error" + error);
      }
    } else {
      throw new Error("Not Authrized");
    }
  },

  editDraft: async (
    _,
    { id, draftID, contentInput: { title, body } },
    context
  ) => {
    const auth = checkAuth(context);
    const { valid, errors } = validateContentInput(title, body);

    const autherId = await findUser(_, { id: id });
    const draft = await Draft.findById(draftID);
    const draftAutId = await draft.draftAuthorId;
    if (!valid) {
      throw new UserInputError("User Input Error" + errors);
    }
    //Auth
    if (auth.id == id) {
      if (draftAutId == autherId.id) {
        // Updating Values

        draft.draftName = title;
        draft.draftBody = body;
        draft.updatedAt = new Date().toISOString();

        const res = await draft.save();
        return {
          id: res._id,
          ...res._doc,
          draftAuther: autherId,
        };
      } else {
        throw new Error("User no autherized to edit the draft");
      }
    } else {
      throw new Error("Not Autherized");
    }
  },
  deleteDraft: async (_, { id, draftID }, context) => {
    //Auth
    if (isAuthrized(_, { id }, context)) {
      const draftAuther = await findUser(_, { id });
      const deleteDraft = await Draft.findById(draftID);
      if (draftAuther._id == deleteDraft.draftAuthorId) {
        return deleteDraft
          .delete()
          .then(() => "Draft Is Deleted Successfully")
          .catch((err) => {
            throw new Error("Failed to delete draft" + err);
          });
      } else {
        throw new AuthenticationError("Not Ownser of the draft");
      }
    } else {
      throw new Error("Not Authrized to delete the draft");
    }
  },
  publishDraft: async (_, { draftID, tags }, context) => {
    //Get Draft From DB
    const draft = await Draft.findById(draftID);
    if (draft == null) {
      throw new Error("Draft Is Missing");
    }
    if (tags.length == 0) {
      throw new Error("Please Add Tags");
    }
    //Create Article
    
    const article = await ArticleControl.createArticle(
      _,
      { draft, tags },
      context
    );
    // Delete Draft From User
    await Draft.findByIdAndDelete(draftID)
      .then(() => console.log("Draft Has Been Published"))
      .catch((err) => console.log(`error happend ${err}`));
    return article;
  },
};
