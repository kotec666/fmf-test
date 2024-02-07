import { useEffect, RefObject, useRef } from "react"

const useOutsideClick = <T extends HTMLElement>(
	ref: RefObject<T>,
	callback: () => void,
) => {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			const { current: target } = ref
			if (target && !target.contains(event.target as HTMLElement)) {
				callbackRef.current()
			}
		}

		document.addEventListener("click", handler)

		return () => document.removeEventListener("click", handler)
	}, [ref])
}

export default useOutsideClick
