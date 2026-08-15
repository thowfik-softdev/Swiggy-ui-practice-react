import React from "react";

/**
 * A horizontal strip of promo cards - image, gradient scrim, text on top.
 * Shared by the home page and the grocery page.
 */
const PromoBanners = ({ banners }) => {
  if (!banners?.length) return null;

  return (
    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {banners.map((banner) => (
        <article
          className="group relative h-[190px] cursor-pointer overflow-hidden rounded-lg border border-line"
          key={banner.id}
        >
          <img
            className="block h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.06]"
            src={banner.image}
            alt={banner.title}
            loading="lazy"
          />

          {/* scrim so the text stays legible over any photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.78] via-black/15 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-[18px] text-white">
            {banner.cta && (
              <span className="mb-2 inline-block rounded-md bg-brand px-[9px] py-[3px] text-[11px] font-bold uppercase tracking-wider">
                {banner.cta}
              </span>
            )}
            <h3 className="text-[19px] font-bold tracking-tight">
              {banner.title}
            </h3>
            <p className="text-[13px] opacity-85">{banner.subtitle}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PromoBanners;
