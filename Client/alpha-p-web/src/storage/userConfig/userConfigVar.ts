import { makeVar } from "@apollo/client";
import initialUserConfig from "./initialUserConfig";
import UserConfig from "./UserConfig";

const userConfigVar = makeVar<UserConfig>(initialUserConfig);
export default userConfigVar;
