import "./App.css";
import "boxicons";
import {
  TransactionForm,
  Transaction,
  TransactionListItem,
  TransactionCrud,
} from "./components/transaction/Transaction";
import {
  Autocomplete,
  useAutocomplete,
} from "./components/autocomplete/Autocomplete";
import { Header } from "./components/header/Header";
import { Modal } from "./components/modal/Modal";
import { ContactUs } from "./components/contactus/ContactUs";
import { ContactUsWidget } from "./components/contactus-widget/ContactUsWidget";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function App() {
  const autoCompleteProps = useAutocomplete([
    "washington",
    "johannesburg",
    "tokyo",
    "taipei",
  ]);
  return (
    <div className="app">
      {/* <TransactionCrud /> */}
      <Header />
      <Autocomplete {...autoCompleteProps} />
      <ContactUsWidget />
    </div>
  );
}

export default App;
