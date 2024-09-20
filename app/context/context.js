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
  const [editData, setEditData] = useState(null);
  const [table, setTable] = useState("");
  const [title, setTitle] = useState("");
  const [planId, setPlanId] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [requestListById, setRequestListById] = useState([]);
  useLayoutEffect(() => {
    setTitle(user?.role === "user" ? "patriot" : user?.role);
  }, [user?.role]);
  const handleToggle = () => setOpenMenu((prev) => !prev);

  const handleClick = (name) => {
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
        setTable,setPlanId,planId,
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
