import { motion } from 'framer-motion'
const HomePage = () => {
  return (
    <div className='w-full h-fit my-auto relative p-4 flex flex-col rounded-xl bg-neutral-700 bg-opacity-20 backdrop-blur-md'>
        <motion.h1 initial={{opacity: 0}} animate={{opacity: 1, transition: { delay: 1, duration: .4}}} className='text-7xl font-bold'>Pool Docs - облако, но в кармане</motion.h1>
        <div className="w-full h-full py-14 flex gap-4">
            <div className="w-1/4 h-full py-4 gap-4 flex flex-col">
                <p className='font-semibold'>Создавайте папки для распределения ваших файлов.</p>
                <motion.img initial={{opacity: 0, x: -100}} animate={{x: 0, opacity: 1, transition: { delay: 1, duration: .4}}} src="/img/undraw_collection_re_4h7d.svg" alt="" />
                <p className='font-semibold'>Мгновенная синхронизация между устройствами.</p>
                <motion.img initial={{opacity: 0, y: 100}} animate={{y: 0, opacity: 1, transition: { delay: 1.1, duration: .4}}} src="/img/undraw_cloud_sync_re_02p1.svg" alt="" />
            </div>
            <div className="w-2/4 h-full flex flex-col">
                <motion.img initial={{opacity: 0, y: -100}} animate={{y: 0, opacity: 1, transition: { delay: 1.2, duration: .4}}} className='w-full' src="/img/undraw_cloud_docs_re_xjht.svg" alt="" />
                <button className='w-full h-fit py-2 mt-auto rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500'>Попробовать бесплатно</button>
            </div>
            <div className="w-1/4 h-full py-4 gap-4 flex flex-col">
                <p className='font-semibold'>Добавляйте любимые и важные файлы в избранное.</p>
                <motion.img initial={{opacity: 0, x: 100}} animate={{x: 0, opacity: 1, transition: { delay: 1.3, duration: .4}}} src="/img/undraw_appreciation_3e2v.svg" alt="" />
                <p className='font-semibold'>За сохранность ваших файлов заботимся - мы и <span className='text-red-500'>Pool Protector</span></p>
                <motion.img initial={{opacity: 0, y: 100}} animate={{y: 0, opacity: 1, transition: { delay: 1.4, duration: .4}}} src="/img/undraw_security_on_re_e491.svg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default HomePage