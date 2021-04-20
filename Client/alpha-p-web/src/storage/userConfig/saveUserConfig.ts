import userConfigVar from "./userConfigVar";

export default function saveUserConfig() {
  window.localStorage.setItem(
    "alph.userConfig",
    JSON.stringify(userConfigVar())
  );
}
