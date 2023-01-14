import { cT } from "types/regT"
import PassStrenght from "../../fns/passStrong"
import send from "./send"

export default function checks({ Nm, Em, Em2, Pw, Pw2, ms, iB, rD, nvg }: cT) {
	iB.current && (iB.current.style.visibility = "hidden")

	// minimum lenght check
	for (let el of [ Nm, Em, Em2, Pw, Pw2 ]) {
		const ell = Number(el.current?.value.length)
		const min = Number(el.current?.minLength)
		if (ell < min) {
			ms.current && (ms.current.style.display = "block")
			ms.current && (ms.current.textContent = `minimum ${min} chars`)
			el.current?.focus()
			return
		}
	}

	// valid email format check
	if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(String(Em.current?.value))) {
		ms.current && (ms.current.style.display = "block")
		ms.current && (ms.current.textContent = "email not valid")
		Em.current?.focus()
		return
	}

	// equal email values check
	if (String(Em.current?.value) !== String(Em2.current?.value)) {
		ms.current && (ms.current.style.display = "block")
		ms.current && (ms.current.textContent = "emails not equal")
		Em2.current?.focus()
		return
	}

	// password strenght check
	let rsp = PassStrenght(String(Pw.current?.value))
	if (rsp !== "ok") {
		ms.current && (ms.current.style.display = "block")
		ms.current && (ms.current.textContent = rsp)
		Pw.current?.focus()
		return
	}

	// equal password values check
	if (String(Pw.current?.value) !== String(Pw2.current?.value)) {
		ms.current && (ms.current.style.display = "block")
		ms.current && (ms.current.textContent = "passwords not equal")
		Pw2.current?.focus()
		return
	}

	ms.current && (ms.current.style.display = "block")
	ms.current && (ms.current.textContent = "sending...")
	send({ Nm, Em, Pw, ms, rD, nvg })
}
