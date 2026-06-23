import { defineType, defineField } from 'sanity';

export const caseType = defineType({
    name: 'case',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Name', type: 'string' }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
        defineField({ name: 'year', title: 'Year', type: 'string' }),
        defineField({ name: 'service', title: 'Service', type: 'string' }),
        defineField({ name: 'industry', title: 'Industry', type: 'string' }),
        defineField({ name: 'hero_desc', title: 'Description', type: 'text' }),
        defineField({ name: 'insta_url', title: 'Instagram URL', type: 'url' }),
        defineField({
            name: 'contentBlocks',
            title: 'Content Blocks',
            type: 'array',
            of: [{
                type: 'object', fields: [
                    { name: 'chapter', type: 'string', title: 'Chapter' },
                    { name: 'text', type: 'text', title: 'Text' }
                ]
            }]
        })
    ]
});