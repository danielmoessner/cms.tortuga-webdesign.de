import S from '@sanity/desk-tool/structure-builder'
import {MdSettings,
  MdPerson,
  MdDescription,
  MdLocalOffer
} from 'react-icons/md'

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem()
        .title('Startseite (SEO)')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Artikel')
        .icon(MdDescription)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Artikel')),
      S.listItem()
        .title('Autoren')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Autoren')),
      S.listItem()
        .title('Kategorien')
        .icon(MdLocalOffer)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Kategorien')),
      // `S.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above.
      ...S.documentTypeListItems().filter(
        listItem =>
          !['category', 'author', 'post', 'siteSettings'].includes(
            listItem.getId()
          )
      )
    ])
