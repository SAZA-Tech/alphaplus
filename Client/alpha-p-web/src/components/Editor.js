import React, { useState } from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import axios from "axios";
import moment from "moment";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "../util/hooks";
const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
export function Editor(props) {
  const theme = "snow";
  const placeholder = props.placeholder;

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],

      ["clean"], // remove formatting button
    ],
  };
  const formats = [
    // Inline
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    // Block
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "direction",
    "align",
    "header",

    //   Embeds
    "image",
    "video",
  ];
  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });
  const [hasBody, setHasBody] = useState(false);
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [filename, setFileName] = useState();
  const [filetype, setFileType] = useState();

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };
  const [getS3SignedUrl, { loading, data, error }] = useMutation(
    s3SignMutation,
    {
      variables: {
        filename,
        filetype,
      },
    }
  );

  function getS3SignedUrlCallBack() {
    getS3SignedUrl();
  }
  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };
  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };
  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData();
    body.append("file", file);
    setFileName(formatFilename(file.name));
    setFileType(file.type);
    const res = (await getS3SignedUrl()).data;

    const response = res.signS3;
    const { signedRequest, url } = response;
    console.log(`signed ${signedRequest}`);
    await uploadToS3(file, signedRequest);
    insertToEditor(url);
  };
  const handleChange = () => {
    if (quill) {
      const html = quill.root.innerHTML;
      // console.log(`${html}`);
      setBody(html.toString());
      console.log(body);
      props.onEditorChange(html);
    }
  };
  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };
  React.useEffect(() => {
    if (quill) {
      if (props.body != "" && !hasBody) {
        console.log(`assign body`);

        setHasBody(true);
        const fetchedBody = props.body;
        console.log(fetchedBody);
        quill.clipboard.dangerouslyPasteHTML(fetchedBody);
      } else {
        console.log(`No Body`);
      }
      quill.on("editor-change", () => {
        handleChange();
      });
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
    }
  }, [quill, body]);
  return (
    <div style={{ maxWidth: "700px", height: 300, marginBottom: 100 }}>
      <div ref={quillRef} />
    </div>
  );
}
