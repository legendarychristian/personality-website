export default function Home() {
    return (
      <div class="min-h-screen bg-c1">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 sm:px-12 md:px-24 lg:px-48 pt-12 sm:pt-16 md:pt-24 lg:pt-36">
          <div class="col-span-1 flex flex-col">
            <div class="flex items-center text-3xl sm:text-4xl md:text-5xl font-poppins font-bold tracking-widest pb-6 sm:pb-8 md:pb-10">
              <h1>Who are you? This is my opinion.</h1>
            </div>
            <button class="w-40 sm:w-32 h-12 bg-c6 rounded-full text-sm font-semibold sm:text-base">
              Upload
            </button>
          </div>
  
          <div class="col-span-2 flex items-center justify-center md:justify-end">
            <div class="w-full md:w-5/6 h-36 md:h-64 bg-c2 rounded-2xl border border-c3"></div>
          </div>
        </div>
  
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-8 sm:px-12 md:px-24 lg:px-48 pt-16 pb-8">
          <div class="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md"></div>
          <div class="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md"></div>
          <div class="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md"></div>
        </div>
  
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-8 sm:px-12 md:px-24 lg:px-48 pb-16">
          <div class="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md"></div>
          <div class="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md"></div>
          <div class="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md"></div>
        </div>
      </div>
    );
  }
  