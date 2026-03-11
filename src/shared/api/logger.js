const style = {
  request: "color: #6366f1; font-weight: bold",
  success: "color: #22c55e; font-weight: bold",
  error: "color: #ef4444; font-weight: bold",
};

export const attachLogger = (instance) => {
  if (import.meta.env.PROD || import.meta.env.MODE === "test") return;

  instance.interceptors.request.use((config) => {
    config._startTime = Date.now();
    console.groupCollapsed(`%c→ ${config.method?.toUpperCase()} ${config.url}`, style.request);
    if (config.params && Object.keys(config.params).length) console.log("Params:", config.params);
    if (config.data && !(config.data instanceof FormData)) console.log("Body:", config.data);
    console.groupEnd();
    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      const ms = Date.now() - (res.config._startTime || 0);
      console.groupCollapsed(`%c← ${res.status} ${res.config.url} (${ms}ms)`, style.success);
      console.log("Data:", res.data);
      console.groupEnd();
      return res;
    },
    (err) => {
      const ms = Date.now() - (err.config?._startTime || 0);
      console.groupCollapsed(`%c✗ ${err.response?.status || "ERR"} ${err.config?.url} (${ms}ms)`, style.error);
      console.error("Error:", err.response?.data || err.message);
      console.groupEnd();
      return Promise.reject(err);
    }
  );
};
