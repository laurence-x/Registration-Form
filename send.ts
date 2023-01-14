import { sendT } from "types/regT"
export default async function send({ Nm, Em, Pw, ms, rD, nvg }: sendT) {
	let fData = new URLSearchParams()
	for (let el of [ Nm, Em, Pw ]) {
		const nm = String(el.current?.name)
		const vl = String(el.current?.value)
		fData.append(nm, vl)
	}
	const controller = new AbortController()
	await fetch("../php/u_reg.php", {
		method: "POST",
		body: fData,
		signal: controller.signal,
	})
		.then((response) => response.text())
		.then((r) => {
			if (r === "e") {
				rD.current && (rD.current.textContent = "an error occurred")
				setTimeout(() => {
					nvg("/")
				}, 6000)
			}
			if (r === "ux") {
				ms.current &&
					(ms.current.textContent = "email already registered")
				Em.current?.focus()
				return
			}
			if (r === "uc") {
				rD.current && (rD.current.textContent = "account created")
				setTimeout(() => {
					nvg("/login")
				}, 6000)
			}
		})
		.catch((error) => {
			rD.current && (rD.current.textContent = "try again later")
			console.error("Error Registration: ", error)
		})
	return () => controller.abort()
}
