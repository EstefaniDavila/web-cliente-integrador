import React, { createContext, useReducer, useRef, useCallback, useContext, ReactNode } from "react";

type AlertDialogState = {
  open: boolean;
  title: string;
  body: string;
  type: "alert" | "confirm" | "prompt";
  cancelButton: string;
  actionButton: string;
  icon?: ReactNode;
  defaultValue?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

type Action = 
  | { type: "close" }
  | (Omit<AlertDialogState, "open"> & { type: "alert" | "confirm" | "prompt" });

const AlertDialogContext = createContext<any>(null);

const alertDialogReducer = (state: AlertDialogState, action: Action): AlertDialogState => {
  switch (action.type) {
    case "close":
      return { ...state, open: false };
    case "alert":
    case "confirm":
    case "prompt":
      return {
        ...state,
        open: true,
        ...action,
        cancelButton: action.cancelButton || (action.type === "alert" ? "Okay" : "Cancel"),
        actionButton: action.actionButton || "Okay",
      };
    default:
      return state;
  }
};

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(alertDialogReducer, {
    open: false,
    title: "",
    body: "",
    type: "alert",
    cancelButton: "Cancel",
    actionButton: "Okay",
    icon: null,
  });

  const resolveRef = useRef<(value: boolean | string) => void>(null);

  function close() {
    dispatch({ type: "close" });
    if (resolveRef.current) resolveRef.current(false);
  }

  function confirm(value?: boolean | string) {
    dispatch({ type: "close" });
    if (resolveRef.current) resolveRef.current(value ?? true);
  }

  const dialog = useCallback(async (params: any) => {
    dispatch(params);
    return new Promise((resolve) => {
      resolveRef.current = resolve as any;
    });
  }, []);

  return (
    <AlertDialogContext.Provider value={dialog}>
      {children}
      {state.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const promptValue = formData.get("prompt");
              confirm(promptValue ? promptValue.toString() : true);
            }}
          >
            <div className="p-6 text-center">
              {state.icon && <div className="mb-4 flex justify-center">{state.icon}</div>}
              <h2 className="text-xl font-semibold mb-2">{state.title}</h2>
              {state.body && <p className="text-gray-500 dark:text-gray-400 mb-4">{state.body}</p>}
              
              {state.type === "prompt" && (
                <input
                  name="prompt"
                  defaultValue={state.defaultValue}
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                  {...state.inputProps}
                />
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 border rounded-md font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 dark:border-zinc-700"
              >
                {state.cancelButton}
              </button>
              {state.type !== "alert" && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                >
                  {state.actionButton}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </AlertDialogContext.Provider>
  );
}

export function useConfirm() {
  const dialog = useContext(AlertDialogContext);
  return useCallback(
    (params: any) => dialog({ ...(typeof params === "string" ? { title: params } : params), type: "confirm" }),
    [dialog]
  );
}

export function usePrompt() {
  const dialog = useContext(AlertDialogContext);
  return (params: any) => dialog({ ...(typeof params === "string" ? { title: params } : params), type: "prompt" });
}

export function useAlert() {
  const dialog = useContext(AlertDialogContext);
  return (params: any) => dialog({ ...(typeof params === "string" ? { title: params } : params), type: "alert" });
}
