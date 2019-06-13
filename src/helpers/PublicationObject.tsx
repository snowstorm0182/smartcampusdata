class PublicationObject {
  crossref: [];
  constructor(obj) {
    if (obj) {
      Object.assign(this, obj)
    }
  }
  getPublishedAt = () => {
    return (Object.keys(this.crossref).length && (this.crossref['container-title'].length > 0)) ? `${this.crossref['container-title'][0]}`:
      (Object.keys(this.crossref).length && this.crossref['publisher'] ? this.crossref['publisher'] :'');
  }
}

export default PublicationObject;
