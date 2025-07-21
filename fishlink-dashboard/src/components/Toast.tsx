// // import { useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { X, CheckCircle, AlertCircle } from 'lucide-react';

// // interface Props {
// //   message: string;
// //   type: 'success' | 'error';
// //   onClose: () => void;
// // }

// // export const Toast: React.FC<Props> = ({ message, type, onClose }) => {
// //   useEffect(() => {
// //     const timer = setTimeout(onClose, 5000);
// //     return () => clearTimeout(timer);
// //   }, [onClose]);

// //   const styles = {
// //     success: { icon: <CheckCircle className="text-green-500" />, border: 'border-green-500' },
// //     error: { icon: <AlertCircle className="text-red-500" />, border: 'border-red-500' },
// //   }[type];

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 50, scale: 0.3 }}
// //       animate={{ opacity: 1, y: 0, scale: 1 }}
// //       exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
// //       className={`fixed bottom-5 right-5 bg-white rounded-lg shadow-xl p-4 max-w-sm border-l-4 ${styles.border}`}
// //     >
// //       <div className="flex items-start">
// //         <div className="flex-shrink-0">{styles.icon}</div>
// //         <div className="ml-3">
// //           <p className="font-medium">{type === 'success' ? 'Success!' : 'Error!'}</p>
// //           <p className="mt-1 text-sm text-gray-500">{message}</p>
// //         </div>
// //         <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-500">
// //           <X size={20} />
// //         </button>
// //       </div>
// //     </motion.div>
// //   );
// // };




// import React from 'react';

// interface ToastProps {
//   message: string;
// }

// const Toast: React.FC<ToastProps> = ({ message }) => {
//   return (
//     <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
//       {message}
//     </div>
//   );
// };

// export default Toast;



// src/components/Toast.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
    const styles = {
        success: { icon: <CheckCircle className="text-green-500" /> },
        error: { icon: <AlertCircle className="text-red-500" /> },
    };

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-5 right-5 bg-white rounded-lg shadow-xl p-4 w-full max-w-sm border-l-4 border-green-500 z-50"
        >
            <div className="flex items-start">
                <div className="flex-shrink-0">{styles[type].icon}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Success!</p>
                    <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={onClose} className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                        <X size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};