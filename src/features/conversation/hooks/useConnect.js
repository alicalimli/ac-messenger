import {useContext} from 'react'
import { UserTokenContext, UserContext } from "/src/setup/app-context-manager";

const useConnect = (ws) => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [userInfo, setUserInfo] = useContext(UserContext);

  const wsConnect = () => {
     if (ws != null && ws.readyState == 1) {
      ws.close();
    }

    let ws_protocol = "wss://";
    if (window.location.protocol == "http:") {
      ws_protocol = "ws://";
    }

    ws = new WebSocket(`${ws_protocol}0.0.0.0:9080/ws?inbox=13-3&token=${userToken}`);

    // Listen for the connection open event then call the sendMessage function
    ws.onopen = function (e) {
      console.log(e);
      console.log("Connected");
    };

    // Listen for the close connection event
    ws.onclose = function (e) {
      console.log(e);
      console.log("Disconnected " + e.reason);
    };

    // Listen for connection errors
    ws.onerror = function (e) {
      console.log(e);
      console.log("Error " + e.reason);
    };

    // ws.onmessage = function (e) {
    //   try {
    //     let data = JSON.parse(e.data);
    //     // if data sent is a text
    //     if (data["type"] == "txt") {
    //       const { uname, msg } = data;
    //       const user = uname === userInfo.email;

    //       const friend = setMessages((messages) => [
    //         ...messages,
    //         { user: user, message: msg },
    //       ]);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  }

  return wsConnect;
}

export default useConnect;