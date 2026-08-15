import React from "react";

/**
 * A horizontal strip of promo cards - image, gradient scrim, text on top.
 *
 * Lifted out of Grocery so the home page and any future page can use the same
 * component instead of a second copy that slowly drifts out of style.
 */
const PromoBanners = ({ banners }) => {
  if (!banners?.length) return null;

  return (
    <div className="banner-row">
      {banners.map((banner) => (
        <article className="promo-banner" key={banner.id}>
          <img src={banner.image} alt={banner.title} loading="lazy" />
          <div className="promo-banner-body">
            {banner.cta && (
              <span className="promo-banner-cta">{banner.cta}</span>
            )}
            <h3 className="promo-banner-title">{banner.title}</h3>
            <p className="promo-banner-sub">{banner.subtitle}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PromoBanners;
