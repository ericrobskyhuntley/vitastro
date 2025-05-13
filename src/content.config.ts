import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders';

const vita = defineCollection({
    loader: file("src/data/_vita.json"),
    schema: z.object({
        person: reference('people'),
        primary: reference('experience')
    })
});

const theses = defineCollection({
    loader: file("src/data/theses.json"),
    schema: z.object({
        name: z.string(),
        doi: z.string(),
        chair: reference('people'),
        committee: z.array(reference('people')).optional()
    })
});

const profile = z.object({
    network: z.string(),
    username: z.string().optional(),
    url: z.string().optional()
})

export const addressType = z.object({
    address: z.string(),
    unit: z.string().optional(),
    postal: z.string(),
    muni: z.string(),
    state: z.string(),
    country: z.string()
})

export const contactType = z.object({
    address: addressType.optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    url: z.string().url().optional(),
    profiles: z.array(profile).optional()
})

const people = defineCollection({
    loader: file("src/data/people.json"),
    schema: z.object({
        name: z.string(),
        image: z.string().optional(),
        contact: contactType.optional(),
        education: z.array(reference('education')).optional(),
        experience: z.array(reference('experience')).optional(),
        summary: z.string().optional()
    })
});

const experience = defineCollection({
    loader: file("src/data/experience.json"),
    schema: z.object({
        name: z.string(),
        startDate: z.string().date(),
        endDate: z.string().date().optional(),
        institution: reference('institutions'),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional()
    })
})

const education = defineCollection({
    loader: file("src/data/education.json"),
    schema: z.object({
        name: z.string(),
        short: z.string().optional(),
        subject: z.string().optional(),
        startDate: z.string().date(),
        endDate: z.string().date().optional(),
        institution: reference('institutions'),
        thesis: reference('theses').optional()
    })
});

const institutions = defineCollection({
    loader: file("src/data/institutions.json"),
    schema: z.object({
        name: z.string(),
        short: z.string().optional(),
        url: z.string().url().optional(),
        parent: z.string().optional(),
        contact: contactType.optional()
    })
});

export const collections = { vita, experience, education, people, theses, institutions }