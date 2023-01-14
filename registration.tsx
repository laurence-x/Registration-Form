import { useRef } from "react"
import { useNavigate } from "react-router-dom"

import CapsOn from "../../fns/capsOn"
import checks from "./checks"
import ku from "./keyup"

export default function Registration() {
	const Nm = useRef<HTMLInputElement>(null!)
	const Em = useRef<HTMLInputElement>(null!)
	const Em2 = useRef<HTMLInputElement>(null!)
	const Pw = useRef<HTMLInputElement>(null!)
	const Pw2 = useRef<HTMLInputElement>(null!)
	const ms = useRef<HTMLParagraphElement>(null!)
	const iB = useRef<HTMLInputElement>(null!)
	const rD = useRef<HTMLDivElement>(null!)
	const nvg = useNavigate()

	const kup = () => ku(Nm, Em, Pw, ms, iB)
	const btn = () => checks({ Nm, Em, Em2, Pw, Pw2, ms, iB, rD, nvg })

	return (
		<>
			<CapsOn />
			<b className="h">Registration</b>
			<div className="l c" ref={rD}>
				<input
					type="text"
					name="unm"
					ref={Nm}
					onKeyUp={kup}
					placeholder="type your name..."
					title="type your name"
					pattern=".{2,25}"
					minLength={Number(2)}
					maxLength={Number(25)}
					autoComplete="off"
					required
				/>
				<input
					type="email"
					name="email"
					ref={Em}
					onKeyUp={kup}
					placeholder="type your email..."
					title="type your email"
					pattern=".{5,40}"
					minLength={Number(5)}
					maxLength={Number(40)}
					autoComplete="off"
					required
				/>
				<input
					type="email"
					ref={Em2}
					onKeyUp={kup}
					placeholder="re-type your email..."
					title="type your email"
					pattern=".{5,40}"
					minLength={Number(5)}
					maxLength={Number(40)}
					autoComplete="off"
					required
				/>
				<input
					type="text"
					name="pass"
					ref={Pw}
					onKeyUp={kup}
					placeholder="type your password..."
					title="type your password"
					pattern=".{6,20}"
					minLength={Number(6)}
					maxLength={Number(20)}
					autoComplete="off"
					required
				/>
				<input
					type="text"
					ref={Pw2}
					onKeyUp={kup}
					placeholder="re-type your password..."
					title="type your password"
					pattern=".{6,20}"
					minLength={Number(6)}
					maxLength={Number(20)}
					autoComplete="off"
					required
				/>
				<br />
				<b ref={ms} className="hide c r"></b>
				<input
					type="button"
					ref={iB}
					value="register"
					onMouseUp={btn}
				/>
				<br />
			</div>
		</>
	)
}
