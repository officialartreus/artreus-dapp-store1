import Image from "next/image";



export default function Home() {
  return (
    <>
      <div className='hero'>
      </div>
      <div className='hero2 h-[474px]'>
      </div>
      <div className="h-[600px]"></div>

      <section className="ml-20">
        <div>
          <p className="text-[32px] font-weight-600">Most Popular Games</p>
          <div>

            <div className="card rounded-md bg-[#FFFFFF] w-[212px] h-[236px]">
              <Image src="/images/A Plague Tale Requiem 1.jpg" alt="search icon" height={212} width={212} />

            </div>
          </div>
        </div>

      </section>

    </>
  )
}
