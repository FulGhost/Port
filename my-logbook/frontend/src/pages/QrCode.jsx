import {QRCodeSVG} from "qrcode.react"

export function QrCode() {
  const organisationId = localStorage.getItem("organisationId")
const scanurl = `${window.location.origin}/scan/${organisationId}`

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 text-center gap-6">
      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] inline-flex flex-col items-center gap-4">
        <h3 className="m-0 text-2xl font-semibold">Your Visitor QR Code</h3>
        <p className="m-0 text-sm text-slate-600">Scan to get Visitor Log</p>
        <div className="p-4 bg-slate-50 rounded-3xl inline-flex">
          <QRCodeSVG
            size={250}
            bgColor="#ffffff"
            fgColor="#1a2e45"
            width={400}
            value={scanurl}
          />
        </div>
      </div>
    </div>
  )
}