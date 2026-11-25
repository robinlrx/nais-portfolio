const mediaAssetProjection = `
  ...,
  asset-> {
    _id,
    url,
    mimeType,
    extension,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  }
`;

export const PROJECT_QUERY = `*[
  _type == "project" &&
  slug.current == $slug
][0] {
  ...,
  gallery1[] {${mediaAssetProjection}},
  gallery2[] {${mediaAssetProjection}},
  gallery3[] {${mediaAssetProjection}},
  gallery[] {${mediaAssetProjection}},
}`;

export const PROJECTSPAGE_QUERY = `*[
    _type == "project"
    && defined(slug.current)
] {
    _id,
    title,
    slug
}`;

export const HOMEPAGE_QUERY = `*[
  _type == "homepage"
][0] {
  ...,
  "bgVideo": bgVideo.asset->url
}`;