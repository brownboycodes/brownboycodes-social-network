import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./state_manager/store";
import { socket, SocketContext } from "./context/socket";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
