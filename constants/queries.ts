export const PROJECT_QUERY = `*[
  _type == "project" &&
  slug.current == $slug
][0] {
  ...
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