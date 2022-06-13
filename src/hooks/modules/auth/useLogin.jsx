import {
  appSettings,
  useTableIcons,
  useAxios,
  useLocalStorage,
  config,
  Context,
} from "@medicorp";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { parseJwt } = config();
  const { fieldTypes, endpointConfig, statusType } = appSettings;
  const { setAppItem, getAppItem } = useLocalStorage();
  const { tableIcons } = useTableIcons();
  const navigate = useNavigate();
  const [formHeader, setFormHeader] = useState({});
  const [formContent, setFormContent] = useState({});
  const [formActions, setFormActions] = useState([]);
  const [formResetKeys, setFormResetKeys] = useState([]);
  const [formTaskRunning, setFormTaskRunning] = useState(false);
  const [freeAction, setFreeAction] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const { logMessage, setToken: setContextToken } = useContext(Context);

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
    }).then((res) => {
      setstatusCode(res.status);
      if (res.status == 200) {
        setInterval(() => {
          // const useDetails = parseJwt(res.data);
          // console.log(useDetails);
          setFormTaskRunning(false);
        }, 2000);
        setAppItem("token", res.data);
        setContextToken(res.data)
        navigate(`/`);
      } else {
        const { msg, errorMessage, message } = res;
        logMessage({
          severity: statusType.error,
          msg: msg ?? errorMessage ?? message ?? res.data ?? " Invalid Login Details!",
        });
      }
    }).catch((error) => {
      const { msg, errorMessage, message } = error;
      logMessage({
        severity: statusType.error,
        msg: msg ?? errorMessage ?? message ?? "Try Again After Some Time!",
      });
    }).finally(() => setFormTaskRunning(false));
  };

  const setLoginFormContent = () => {
    setFormResetKeys([])
    setFormContent(!isForgotPassword ?
      {
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
      } :
      {
        email: {
          label: "Email",
          type: fieldTypes.text.type,
          size: "small",
          variant: "outlined",
          col: 12,
          validator: {
            required: { value: true, message: "Please Enter Email Address" },
          },
        }
      }
    );
    setFormActions([
      {
        label: !isForgotPassword ? "Login" : "Reset Password",
        endIcon: !isForgotPassword && tableIcons.Login,
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

  const handleForgotPassword = (forgot) => {
    setIsForgotPassword(forgot)
  }

  useEffect(() => {
    setLoginFormContent();
  }, [isForgotPassword]);

  return {
    formHeader,
    formContent,
    formActions,
    formResetKeys,
    formTaskRunning,
    freeAction,
    token,
    statusCode,
    handleForgotPassword,
    isForgotPassword
  };
};

export default useLogin;
