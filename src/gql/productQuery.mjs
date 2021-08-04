// use product path

export const productQuery = `query product($code: String!) {
    product(code: $code) {
    altText
    averageOverallRatings
    baseProduct
    channels
    classifications {
      code
      features {
        code
        comparable
        description
        featureUnit {
          name
          symbol
          unitType
        }
        featureValues {
          value
          code
        }
        name
        range
        type
      }
      name
    }
    code
    colorGroup
    colorName
    comingSoon
    crossSellProductUrl
    crossSellSizeGroup
    customizable
    flxCustomization
    availableForPickup
    department
    pdpGroupId
    returnable
    customizationType
    description
    findInStoreEligible
    lscoBreadcrumbs {
      categoryCode
      name
      url
    }
    galleryImageList {
      galleryImage {
        altText
        format
        galleryIndex
        imageType
        url
      }
      videos {
        altText
        format
        galleryIndex
        url
      }
    }
    itemType
    maxOrderQuantity
    merchantBadge
    minOrderQuantity
    multidimensional
    name
    noOfRatings
    pdpCmsContentId1
    pdpCmsContentId2
    preferredCategory
    price {
      code
      currencyIso
      formattedValue
      hardPrice
      hardPriceFormattedValue
      maxQuantity
      minQuantity
      priceType
      regularPrice
      regularPriceFormattedValue
      softPrice
      softPriceFormattedValue
      value
    }
    promotionalBadge
    purchasable
    soldIndividually
    soldOutForever
    summary
    url
    variantLength
    variantOptions {
      code
      colorName
      displaySizeDescription
      maxOrderQuantity
      minOrderQuantity
      priceData {
        code
        currencyIso
        formattedValue
        hardPrice
        hardPriceFormattedValue
        maxQuantity
        minQuantity
        priceType
        regularPrice
        regularPriceFormattedValue
        softPrice
        softPriceFormattedValue
        value
      }
      stock {
        stockLevel
        stockLevelStatus
      }
      upc
      url
    }
    variantSize
    variantType
    variantWaist
  }
}`;
export default {
  productQuery
}