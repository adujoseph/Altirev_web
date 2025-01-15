import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppSelector } from "../redux/hook";

const StateContext = createContext();

// const initialState = {
//   userProfile: false,
// };

export const ContextProvider = ({ children }) => {
  const user = useAppSelector((state) => state?.user?.user);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [electionData, setElectionData] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [editData, setEditData] = useState(null);
  const [table, setTable] = useState("");
  const [title, setTitle] = useState("");
  const [planId, setPlanId] = useState("");
  const [payRef, setPayRef] = useState("");
  const [emailRef, setEmailRef] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [requestListById, setRequestListById] = useState([]);
  useLayoutEffect(() => {
    setTitle(user?.role === "user" ? "Observer" : user?.role);
  }, [user?.role]);
  const handleToggle = () => setOpenMenu((prev) => !prev);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        open,
        handleClick,
        openMenu,
        setOpenMenu,
        setTable,
        setPlanId,
        planId,
        setPayRef,
        payRef,
        table,
        title,
        handleToggle,
        setTitle,
        setOpen,
        editData,
        edit,
        setEditData,
        setEdit,
        setRequestList,
        requestList,
        requestListById,
        setRequestListById,
        setEmailRef,
        emailRef,
        electionData,
        setElectionData,
        showOverview,
        setShowOverview,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
