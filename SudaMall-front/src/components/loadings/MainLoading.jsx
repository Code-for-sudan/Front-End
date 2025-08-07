

const MainLoading = ({ text }) => {
  return (
    <div className="fixed inset-0 w-full h-screen flex justify-center items-center bg-white/60">
      <div className="flex flex-col items-center gap-4">
        <div className="loader" />
        <p className="text-sm">{text ? text : 'جاري التحميل...'}</p>
      </div>
    </div>
  )
}

export default MainLoading
