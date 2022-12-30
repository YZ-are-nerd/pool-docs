const FilePageSkeleton = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2 overflow-hidden">
        <div className="max-w-2xl gap-2 flex flex-col p-3 h-full w-full mx-auto">
            <div className="w-full h-fil flex items-center justify-between">
                <div className="w-fit h-fit flex flex-col gap-1">
                    <div className="w-1/3 h-3 rounded-xl animate-pulse bg-neutral-100"></div>
                    <div className="w-1/4 h-3 rounded-xl animate-pulse bg-neutral-100"></div>
                </div>
                <div className="w-1/4 h-4 rounded-xl animate-pulse bg-neutral-100"></div>
            </div>
            <div className="w-full h-full rounded-xl animate-pulse bg-white"></div>
        </div>
    </section>

  )
}

export default FilePageSkeleton