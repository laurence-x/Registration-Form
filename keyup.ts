import BtnMsg from "../../fns/btnMsg"

const ku = (
	Nm: React.RefObject<HTMLInputElement>,
	Em: React.RefObject<HTMLInputElement>,
	Pw: React.RefObject<HTMLInputElement>,
	ms: React.RefObject<HTMLParagraphElement>,
	iB: React.RefObject<HTMLInputElement>,
) => {
	BtnMsg(ms, iB) // show btn, hide message

	// remove empty spaces
	Nm.current && (Nm.current.value = Nm.current.value.replace(/\s/g, ""))
	Em.current && (Em.current.value = Em.current.value.replace(/\s/g, ""))
	Pw.current && (Pw.current.value = Pw.current.value.replace(/\s/g, ""))
}

export default ku
