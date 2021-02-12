export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Startseite (SEO)',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beschreibung',
      description: 'Die Beschreibung des Blogs für Suchmaschinen und auf Sozialen Netzwerken'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Keywords, die den Blog beschreiben',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Der Hauptautor des Blogs',
      title: 'Author',
      to: [{ type: 'author' }]
    }
  ]
}
