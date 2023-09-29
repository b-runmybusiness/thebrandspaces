<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    

    const BLOGURL = "https://d251pozxe7k40y.cloudfront.net/blog/featured/";

    useHead({
        title: 'The Brand Spaces',
        meta: [
            { name: 'description', content: 'We at The Brand Spaces consult clients on their space requirements and curate properties that align with their vision' }
        ],
    })

    
</script>

<template>
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden">
        <!-- Gradients -->
        <div aria-hidden="true" class="flex absolute -top-96 left-1/2 transform -translate-x-1/2">
            <div class="bg-gradient-to-r from-red-300/50 to-red-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>
            <div class="bg-gradient-to-tl from-red-50 via-red-100 to-red-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]"></div>
        </div>
        <!-- End Gradients -->

        <div class="relative z-10">
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div class="max-w-2xl text-center mx-auto">
                    <p class="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-red-600 to-red-500 text-transparent">
                        Space Leasing | Business Franchisee | Pre- leased 
                    </p>

                    <!-- Title -->
                    <div class="mt-5 max-w-2xl">
                        <h1 class="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                            SPACE that works for you.
                        </h1>
                    </div>
                    <!-- End Title -->

                    <div class="mt-5 max-w-3xl">
                        <p class="text-lg text-gray-600">We at The Brand Spaces consult clients on their space requirements and curate properties that align with their vision</p>
                    </div>

                    <!-- Buttons -->
                    <div class="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center">
                        <NuxtLink to="/leasing" class="inline-flex justify-center items-center gap-x-3 text-center bg-red-600 hover:bg-red-500 border border-transparent text-white text-sm font-medium rounded-md px-4" href="javascript:;">
                            Explore Space Leasing
                            <Icon name="material-symbols:arrow-forward-ios-rounded" />
                        </NuxtLink>
                        <a class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm" href="https://franchisedestiny.com/" target="_blank">
                            Explore Business Franchise
                            <Icon name="ph:share-fat" />
                        </a>
                    </div>
                    <!-- End Buttons -->
                </div>
            </div>
        </div>
    </div>
    <!-- End Hero -->

    <section class="bg-white py-6 md:py-20 border-b relative">
        <div class='flex flex-col md:flex-row gap-6 md:gap-12 w-full items-center p-6 rounded-md max-w-6xl mx-auto z-[1] relative'>
            <img src='/images/about-us.svg' alt='sample-image' class='md:w-1/2 md:h-[60vh] object-cover rounded' loading="lazy" />
            <div class='hero-text flex flex-col gap-4 items-start justify-center md:w-1/2'>
                <h2 class="uppercase">About Us</h2>
                <div class='text-2xl font-bold uppercase'>The Leading Franchise Development Firm</div>
                <p class='text-sm text-zinc-500'>Whether you have been franchising your business or you are thinking about franchise growth for the first time, The Brand Spaces can help you take your business to the next level! Our services cover all your bases, from attracting leads to creating the software and documents you need to franchise your business with ease. Check out our franchise consulting services and see how we can assist you in your franchise development projects!</p>
                <button class='bg-zinc-700 rounded-sm px-10 py-2 text-zinc-100'>Learn more</button>
            </div>
        </div>
        <!-- absolutes-content -->
        <img src="/images/boxed-vector.webp" alt="boxed-vector" class="absolute top-10 left-10 w-20 md:w-40 rotate-90">
        <img src="/images/boxed-vector.webp" alt="boxed-vector" class="absolute top-10 right-10 w-20 md:w-40">
    </section>

    <section class="bg-zinc-800 text-white w-full py-6 text-center">
        <div class="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto justify-end px-6 md:px-0" >
            <div class="font-bold md:text-xl md:text-right">CONTACT US FOR A FREE <br/> FRANCHISE FEASIBILITY CONSULTATION</div>
            <NuxtLink to="/contact">
                <button class="bg-primary text-white px-6 py-3 md:px-8 rounded flex gap-2 items-center justify-center shadow-lg shadow-primary/50 w-full">
                    Contact us
                    <Icon name="material-symbols:arrow-right-alt-rounded" class="w-6 h-6" />
                </button>
            </NuxtLink>
        </div>
    </section>

    <!-- we can help you -->
    <section class="bg-white py-6 md:py-20 bg-indigo-50/50">
        <div class="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-6">
            <div class="md:w-[60%] border-b md:border-b-0 pb-6 md:pb-0 md:border-r border-zinc-800 pr-6" >
                <h2 class="text-3xl font-bold mb-8">We can help you find the perfect franchise. <br/> <span class="text-primary">Independent advice you can trust.</span></h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="flex gap-5 items-center">
                        <Icon name="iconamoon:certificate-badge-light" class="w-20 h-20" />
                        <div>
                            <h3 class="font-bold mb-2">User-friendly franchise directory</h3>
                            <p class="text-sm">Tailor your search of over 800 franchises and read our in-depth company profiles. We even offer a free enquiry service.</p>
                        </div>
                    </div>
                    <div class="flex gap-5 items-center">
                        <Icon name="iconoir:thumbs-up" class="w-20 h-20" />
                        <div>
                            <h3 class="font-bold mb-2">A track record of success</h3>
                            <p class="text-sm">Part of DC Thomson Media, we’ve been helping people like you find the right franchise since 1999.</p>
                        </div>
                    </div>
                    <div class="flex gap-5 items-center">
                        <Icon name="octicon:law-24" class="w-20 h-20" />
                        <div>
                            <h3 class="font-bold mb-2">Impartial advice from industry experts</h3>
                            <p class="text-sm">Our specialist writers give you the inside track on the essential elements to consider before investing in a franchise.</p>
                        </div>
                    </div>
                    <div class="flex gap-5 items-center">
                        <Icon name="mdi:file-document-check-outline" class="w-20 h-20" />
                        <div>
                            <h3 class="font-bold mb-2">Comprehensive coverage of a dynamic sector</h3>
                            <p class="text-sm">We’re first with the latest news. Plus check out our free digital magazines, trend reports and video interviews.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-[40%]" >
                <div class="uppercase text-xs">EXPERTS IN THE MARKETPLACE</div>
                <div class="text-3xl mb-8">WE WORK IN ALL <br/> FRANCHISE <br/> INDUSTRIES</div>
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="bg-white border-8 rounded-xl md:rounded-full h-44 md:w-44 border-primary text-primary flex flex-col items-center justify-center">
                        <div class="font-bold text-5xl">150+</div>
                        <div class="text-sm font-bold">Franchise</div>
                    </div>
                    <div class="bg-primary text-white border-8 rounded-xl md:rounded-full h-44 md:w-44 border-primary text-primary flex flex-col items-center justify-center">
                        <div class="font-bold text-5xl">100+</div>
                        <div class="text-sm font-bold">Locations</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--New to franchise process -->
    <section class="bg-white md:pt-20">
        <div class="flex flex-col md:flex-row w-full">
            <div class="md:w-1/2">
                <div class="bg-primary p-6 md:py-20 md:pl-20 text-white">
                    <h4 class="uppercase" >Start Franchising today</h4>
                    <h1 class="text-4xl uppercase" >New to the <br/> franchise process?</h1>
                    <h5 class="my-8 pl-12 flex gap-3 items-center" >
                        <span class="w-12 h-[1px] bg-white mt-1"></span>
                        We Are Here To Help
                    </h5>
                    <p class="md:pr-8" >A franchise consultant at Accurate Franchising, Inc. can walk you through the process from A to Z. We start by helping you find out if your business is fit to become a franchise and then move on to building up your infrastructure. Franchisees need training, resources, support, and a strong brand to invest in. We work hand in hand with you as you build up your brand, then assist you in marketing and signing new franchisees.</p>
                    <img class="mt-8 w-full h-full object-cover" src="/images/docs.svg" alt="" loading="lazy"  />
                </div>
                <div class="md:px-20 md:py-10 p-6">
                    <h2 class="text-3xl font-bold mb-4">10+ YEARS OF <br/> FRANCHISING EXCELLENCE</h2>
                    <p>Your emerging franchise brand will benefit from our 35+ years of actual franchising experience in building, selling, and supporting franchise brands all around the globe. Since 1986, we have been on the cutting edge of the franchise industry.</p>
                    <h5 class="my-8 pl-12 flex gap-3 items-center">
                        <span class="w-12 h-[1px] bg-gray-600 mt-1"></span>
                        Let's Have a Consultation
                    </h5>
                </div>
            </div>
            <div class="md:w-1/2">
                <div class="bg-primary/10 md:p-20 md:mt-20 p-6">
                    <h4 class="uppercase">STREAMLINE FRANCHISE OPERATIONS</h4>
                    <h1 class="text-4xl uppercase">WANT TO GROW YOUR <br/> BRAND?</h1>
                    <h5 class="my-8 pl-12 flex gap-3 items-center">
                        <span class="w-12 h-[1px] bg-zinc-500 mt-1"></span>
                        Reduce Costs & Improve Efficiencies
                    </h5>
                    <p>Our experts utilize their experience to help you generate leads, improve the real estate services you offer franchisees, and even break into international franchising. We can support you through the marketing and sales process to find and sign quality leads who will become motivated owner-operators, keeping your brand growing and strong. Not only do we know how to franchise a business, but also how to further strengthen your franchise.</p>
                    <img class="mt-8 w-full h-full object-cover" src="/images/grow.jpg" alt="" loading="lazy" />
                </div>
                <div class="md:px-20 md:py-10 p-6">
                    <h2 class="text-3xl font-bold mb-4">10+ YEARS OF <br/> FRANCHISING EXCELLENCE</h2>
                    <p>Your emerging franchise brand will benefit from our 35+ years of actual franchising experience in building, selling, and supporting franchise brands all around the globe. Since 1986, we have been on the cutting edge of the franchise industry.</p>
                    <h5 class="my-8 pl-12 flex gap-3 items-center">
                        <span class="w-12 h-[1px] bg-gray-600 mt-1"></span>
                        Let's Have a Consultation
                    </h5>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Clients -->
    <section class="bg-white md:py-20 py-6 border-b">
        <div class="max-w-6xl mx-auto p-6 md:p-0" >
            <h2 class="uppercase mb-12 text-3xl font-bold text-center"><span class="text-primary">BRAND</span> EXPERIENCE</h2>
            <div class="grid grid-cols-5 gap-5">
                <figure class="shadow border border-zinc-100 rounded-xl p-3 flex items-center justify-center">
                    <img src="/brands/1.jpg" alt="">
                </figure>
                <figure class="shadow border border-zinc-100 rounded-xl p-3 flex items-center justify-center">
                    <img src="/brands/2.jpg" alt="">
                </figure>
                <figure class="shadow border border-zinc-100 rounded-xl p-3 flex items-center justify-center">
                    <img src="/brands/3.jpg" alt="">
                </figure>
                <figure class="shadow border border-zinc-100 rounded-xl p-3 flex items-center justify-center">
                    <img src="/brands/4.jpg" alt="">
                </figure>
                <figure class="shadow border border-zinc-100 rounded-xl p-3 flex items-center justify-center">
                    <img src="/brands/5.jpg" alt="">
                </figure>
            </div>
        </div>
    </section>
  
  </div>
</template>
