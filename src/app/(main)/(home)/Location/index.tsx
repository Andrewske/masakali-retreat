const Location = () => {
  return (
    <section className="flex justify-center items-center flex-wrap p-4 w-full">
      <div className="flex flex-col justify-evenly items-center bg-gray-200 w-full max-w-[450px] min-h-[450px]">
        <h2 className="uppercase w-[calc(100%-4rem)]">Location & Contacts</h2>
        <div className="w-[calc(100%-4rem)] text-xl">
          <p>
            9km<span className="text-base">/5.6 miles</span>
          </p>
          <p>distance to ubud</p>
        </div>
        <div className="w-[calc(100%-4rem)] text-xl">
          <p>
            43km<span className="text-base">/27 miles</span>
          </p>
          <p>distance to airport</p>
        </div>
        <div className="w-[calc(100%-4rem)] flex flex-wrap justify-evenly">
          <div className="flex-1 min-w-max text-sm mb-4">
            <p className="uppercase text-base font-bold">hotel address</p>
            <p>Masakali Retreat</p>
            <p>Br. Ayah Kelusa Payangan</p>
            <p>Gianyar Bali 80572</p>
          </div>
          <div className="flex-1 min-w-max text-sm mb-4">
            <p className="uppercase text-base font-bold">hotel contact</p>
            <p>
              <a href="mailto: info@masakaliretreat.com">
                info@masakaliretreat.com
              </a>
            </p>
            <p>
              <a href="https://facebook.com/masakaliretreat">
                facebook.com/masakaliretreat
              </a>
            </p>
            <p>
              <a href="https://instagram.com/masakaliretreat">
                instagram.com/masakaliretreat
              </a>
            </p>
            <p>+62 823-4646-2331</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
