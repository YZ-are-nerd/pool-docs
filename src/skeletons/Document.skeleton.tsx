import DocumentHolder from "../components/global/DocumentHolder"

const DocumentSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-neutral-200 bg-opacity-50 hover:bg-neutral-200">
      <DocumentHolder />
      <div className="w-1/3 mx-auto h-4 rounded-lg animate-pulse bg-neutral-200"></div>
    </div>
  )
}

export default DocumentSkeleton