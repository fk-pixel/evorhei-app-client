import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";
import axios from "axios";
import moment from "moment";
import {notifies} from "../components/UIElements/NotificationHelper";
const AppContext = createContext();

const initialUser = {
  email: "",
  username: "",
  list: [],
  createdAt: "",
  _id: "",
};

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(initialUser);
  const [isLogin, setIsLogin] = useState(false);

  const [userList, setUserList] = useState([]);

  const getPersistedData = () => {
    const storageData = localStorage.getItem("evorhei-app");
    if (!storageData) {
      return;
    }
    const userData = JSON.parse(storageData);
    if (new Date().toISOString() > userData?.loginEnd) {
      logoutHandler();
      notifies("token-invalid")
      return;
    }
    setToken(userData?.token);
    setUser(userData?.user);
    setIsLogin(userData?.isLogin);
  };

  useEffect(() => {
    const storageData = localStorage.getItem("evorhei-app");
    if (!storageData) {
      return;
    }
    const userData = JSON.parse(storageData);
    if (new Date().toISOString() > userData?.loginEnd) {
      logoutHandler();
      notifies("token-invalid")
      return;
    }
    setToken(userData?.token);
    setUser(userData?.user);
    setIsLogin(userData?.isLogin);
  }, []);

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(`http://localhost:8000/user/logout`, {}, config);
    } catch (error) {
      console.log(error.message);
    }
    localStorage.removeItem("evorhei-app");
    setToken(null);
    setUser(initialUser);
    setIsLogin(false);
    setIsLoading(false);
    notifies("logout")
  };

  const loginHandler = (values) => {
    setIsLoading(true);
    try {
      axios
        .post(`http://localhost:8000/user/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data);
          const persistData = {
            token: res.data.token,
            user: res.data.user,
            isLogin: true,
            loginEnd: moment().add(12, "hours").toISOString(),
          };
          localStorage.setItem("evorhei-app", JSON.stringify(persistData));
          getPersistedData();
          notifies("login");
          setIsLoading(false);
        })
        .catch((err) => {
            notifies("must-register")
            throw err;
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const materialHandler = (values) => {
    console.log(values);
    if (!token) {
      return notifies("not-found");
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        `http://localhost:8000/products/add-product`,
        {
          material: values.material,
          chargenNumber: values.chargeNumber,
          menge: values.menge,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        notifies("add")
        getUserListHandler();
      })
      .catch((error) => {
        console.log(error.message);
        notifies("error");
      });
  };

  const getUserListHandler = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `http://localhost:8000/user/get-list`,
        config
      );
      if (!response) {
        return notifies("not-found");
      }
      const list = response.data
        ? response.data.filter((list) => list != null)
        : [];  
      setUserList(list);
    } catch (error) {
        notifies("error")
      setUserList([]);
    }
  };

  const deleteUserListHandler = async (id) => {
    try {
      const findProduct = userList.find((list) => list._id === id);
      if (!findProduct) {
        return notifies("no-product");
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(
        `http://localhost:8000/user/delete-list/${id}`,
        config
      );
      getUserListHandler();
      notifies("delete");
    } catch (error) {}
  };

  // Update item from list
  const updateMaterialHandler = async (values) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const updateProduct = await axios.patch(
      `http://localhost:8000/products/${values.id}`,
      {
        material: values.material,
        chargenNumber: values.chargeNumber,
        menge: values.menge,
      },
      config
    );
    console.log(updateProduct.data);
    getUserListHandler();
    notifies("update");
  };

  const value = {
    isLoading,
    token,
    isLogin,
    user,
    userList,
    loginHandler,
    logoutHandler,
    materialHandler,
    getUserListHandler,
    deleteUserListHandler,
    updateMaterialHandler,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
