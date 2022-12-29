import DocumentHolder from "../../../global/DocumentHolder"

const FilesDesk = () => {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2 rounded-xl bg-neutral-100">
      <h2>Ваши документы</h2>
      <div className="w-full h-full grid grid-cols-6 grid-rows-4">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-neutral-200">
          <DocumentHolder />
          <p className="line-clamp-1">Проверочный документ</p>
          {/* <p className="text-xs">12/12/2022</p> */}
        </div>
      </div>
    </div>
  )
}

export default FilesDesk