import {
  appSettings,
  useTableIcons,
  useAxios,
  useLocalStorage,
  config,
} from "@medicorp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { parseJwt } = config();
  const { fieldTypes, endpointConfig } = appSettings;
  const { setAppItem, getAppItem } = useLocalStorage();
  const { tableIcons } = useTableIcons();
  const navigate = useNavigate();
  const [formHeader, setFormHeader] = useState({});
  const [formContent, setFormContent] = useState({});
  const [formActions, setFormActions] = useState([]);
  const [formResetKeys, setFormResetKeys] = useState([]);
  const [formTaskRunning, setFormTaskRunning] = useState(false);
  const [freeAction, setFreeAction] = useState(null);

  const [token, setToken] = useState(getAppItem("token") || null);
  const [statusCode, setstatusCode] = useState();

  const [{ }, authData] = useAxios(
    {
      url: endpointConfig.authentication.authentication,
      method: "POST",
    },
    { manual: true }
  );

  const handleSubmit = (data) => {
    setFormTaskRunning(true);
    authData({
      data: {
        userName: data.email,
        password: data.password,
        fcmToken: "",
        organizationId: 1,
      },
    })
      .then((res) => {
        setstatusCode(res.status);
        // const useDetails = parseJwt(res.data);
        // console.log(useDetails);
        setAppItem("token", res.data);
        setInterval(() => {
          setFormTaskRunning(false);
        }, 2000);
        navigate(`/`);
      })
      .catch((error) => error)
      .finally(() => setFormTaskRunning(false));
  };

  const setLoginFormContent = () => {
    setFormContent({
      email: {
        label: "Email",
        type: fieldTypes.text.type,
        size: "small",
        variant: "outlined",
        col: 12,
        validator: {
          required: { value: true, message: "Please Enter Email Address" },
        },
      },
      password: {
        label: "Password",
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.password.type,
        value: "",
        validator: {
          required: { value: true, message: "Password is required" },
        },
      },
    });
    setFormActions([
      {
        label: "Login",
        endIcon: tableIcons.Login,
        loadingPosition: "end",
        isSubmit: true,
        color: "primary",
        action: (data) => {
          handleSubmit(data);
        },
        sx: { margin: "10px auto", width: "100%", borderRadius: "23px" },
        cnt_sx: { width: "100%" },
      },
    ]);
  };

  useEffect(() => {
    setLoginFormContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formHeader,
    formContent,
    formActions,
    formResetKeys,
    formTaskRunning,
    freeAction,
    token,
    statusCode,
  };
};

export default useLogin;
