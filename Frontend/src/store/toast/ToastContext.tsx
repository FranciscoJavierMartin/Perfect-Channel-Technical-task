import React from 'react';

export interface Toast {
  message: string;
  id: number;
  isError: boolean;
}

const ToastContext = React.createContext(
  (message: string, isError?: boolean) => {}
);

export function useToastContext() {
  return React.useContext(ToastContext);
}

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (toasts.length > 0) {
      timer = setTimeout(() => setToasts((toasts) => toasts.slice(1)), 3000);
    }

    return () => clearTimeout(timer);
  }, [toasts]);

  const addToast = React.useCallback(
    function (message: string, isError?: boolean) {
      // Use Math.random to generate a pseudorandom id
      // and avoid to import a library for that task
      setToasts((toasts) => [
        ...toasts,
        { message, id: Math.random(), isError: !!isError },
      ]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className='toasts-wrapper'>
        {toasts.map((toast: Toast) => (
          <div
            className={[
              'custom-toast',
              'text-white',
              toast.isError ? 'bg-danger' : 'bg-primary',
            ].join(' ')}
            key={toast.id}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
