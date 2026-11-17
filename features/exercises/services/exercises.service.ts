import { EXERCISES } from '../data';
import type { Category, Exercise } from '../types';

// Simula la demora de una base de datos o de una API real
const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export interface ExerciseFilters {
    q?: string;
    category?: string;
    duration?: string;
}

export async function getExercises(
    filters: ExerciseFilters = {}
): Promise<Exercise[]> {
    await delay(800);

    const q = filters.q?.trim().toLowerCase();

    const maxDuration = filters.duration
        ? Number(filters.duration)
        : null;

    return EXERCISES.filter((exercise) => {

        // Filtrar por nombre o músculo
        const matchesText =
            !q ||
            exercise.name.toLowerCase().includes(q) ||
            exercise.muscle.toLowerCase().includes(q);

        // Filtrar por categoría
        const matchesCategory =
            !filters.category ||
            exercise.category === (filters.category as Category);

        // Filtrar por duración
        const matchesDuration =
            maxDuration === null ||
            (Number.isFinite(maxDuration) &&
                exercise.durationMin <= maxDuration);

        return (
            matchesText &&
            matchesCategory &&
            matchesDuration
        );
    });
}

export async function getExerciseById(
    id: number
): Promise<Exercise | null> {
    await delay(300);

    return EXERCISES.find(
        (exercise) => exercise.id === id
    ) ?? null;
}
