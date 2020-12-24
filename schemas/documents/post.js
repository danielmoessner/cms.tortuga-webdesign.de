import {format} from 'date-fns'

export default {
  name: 'post',
  type: 'document',
  title: 'Artikel',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel sollten spannend, anschaulich und nicht zu lang sein'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Der Slug erscheint in der URL (www.blog.de/artikel/SLUG/)',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Veröffentlicht am'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Hauptbild'
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Auszug',
      description:
        'Der Auszug wird bei Zusammenfassungen und auf Google angezeigt oder beim Teilen des Artikels in Sozialen Netzwerken'
    },
    {
      name: 'authors',
      title: 'Autoren',
      type: 'array',
      of: [
        {
          type: 'authorReference'
        }
      ]
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Kategorien',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
