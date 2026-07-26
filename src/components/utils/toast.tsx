import { toast as toastify } from "react-toastify"

import toastSuccessIcon from "assets/icons/toast-success.webp"
import toastErrorIcon from "assets/icons/toast-error.webp"
import toastInfoIcon from "assets/icons/toast-info.webp"

const icons = {
	success: toastSuccessIcon,
	error: toastErrorIcon,
	info: toastInfoIcon,
} as const

type ToastType = keyof typeof icons

function sealIcon(type: ToastType) {
	return <img src={icons[type]} alt="" className="toast-wax-seal" />
}

export const toast = {
	success: (message: string) =>
		toastify.success(message, { icon: () => sealIcon("success") }),
	error: (message: string) =>
		toastify.error(message, { icon: () => sealIcon("error") }),
	info: (message: string) =>
		toastify.info(message, { icon: () => sealIcon("info") }),
}
