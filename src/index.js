import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import { Provider } from "react-redux";
import { configureStore } from "./configureStore";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
	return (
		<Provider store={configureStore()}>
			<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
				<MoralisDappProvider>
					<App />
				</MoralisDappProvider>
			</MoralisProvider>
		</Provider>
	);
};

/** Get your free Moralis Account https://moralis.io/ */
ReactDOM.render(
	<React.StrictMode>
		<Application />
	</React.StrictMode>,
	document.getElementById("root")
);
