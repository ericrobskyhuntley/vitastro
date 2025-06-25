import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const profile = z.object({
    network: z.string(),
    username: z.string().optional(),
    url: z.string().optional()
})

const address = z.object({
    address: z.string(),
    unit: z.string().optional(),
    postal: z.string(),
    muni: z.string(),
    state: z.string(),
    country: z.string()
})
export type Address = z.infer<typeof address> | undefined;

const contact = z.object({
    address: address.optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    url: z.string().url().optional(),
    profiles: z.array(profile).optional()
})
export type Contact = z.infer<typeof contact> | undefined;

const experience = z.object({
    name: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date().optional(),
    institution: reference('institutions'),
    summary: z.string().optional(),
    highlights: z.array(z.string()).optional()
})
export type Experience = z.infer<typeof experience> | undefined;

const education = z.object({
    name: z.string(),
    short: z.string().optional(),
    subject: z.string().optional(),
    startDate: z.string().date(),
    endDate: z.string().date().optional(),
    institution: reference('institutions'),
    thesis: reference('theses').optional()
})
export type Education = z.infer<typeof education> | undefined;

const people = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/data/people" }),
    schema: z.object({
        name: z.string(),
        creds: z.array(z.string()).optional(),
        image: z.string().optional(),
        contact: contact.optional(),
        education: z.array(education).optional(),
        experience: z.array(experience).optional(),
        summary: z.string().optional()
    })
});

const vita = defineCollection({
    loader: file("src/data/_vita.json"),
    schema: z.object({
        person: reference('people')
    })
});

const theses = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/data/theses" }),
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        doi: z.string().optional(),
        chair: reference('people'),
        committee: z.array(reference('people')).optional()
    })
});

const institutions = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/data/institutions" }),
    schema: z.object({
        name: z.string(),
        short: z.string().optional(),
        url: z.string().url().optional(),
        parent: z.string().optional(),
        contact: contact.optional()
    })
});

export const collections = { vita, people, theses, institutions }