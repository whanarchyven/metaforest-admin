export const imagePrefix = (imageUrl: string) => {
  if (imageUrl.includes('nft.mfgame.org')) {
    return imageUrl;
  } else {
    return `${process.env.NEXT_IMAGE_PREFIX}/${imageUrl}`;
  }
};
