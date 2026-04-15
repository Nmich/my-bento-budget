import { type } from "node:os";

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
	pgm.alterColumn("categories", "user_id", {
		notNull: false,
	});
	pgm.addColumn("categories", {
		type: {
			type: "varchar(50)",
			notNull: true,
			default: "non-essentielle",
		},
	});
	pgm.sql(`
			INSERT INTO categories (name, type, user_id) VALUES
			('Courses', 'essentielle', NULL),
			('Loyer / Logement', 'essentielle', NULL),
			('Transport', 'essentielle', NULL),
			('Santé', 'essentielle', NULL),
			('Factures & Abonnement', 'essentielle', NULL),
			('Maison', 'essentielle', NULL),
			('Voiture', 'essentielle', NULL),
			('Restaurants & Cafés', 'non-essentielle', NULL),
			('Shopping', 'non-essentielle', NULL),
			('Divertissement', 'non-essentielle', NULL),
			('Voyages', 'non-essentielle', NULL),
			('Sport & Bien-être', 'non-essentielle', NULL),
			('Animaux', 'non-essentielle', NULL),
			('Cadeaux', 'non-essentielle', NULL),
			('Épargne', 'non-essentielle', NULL)
		`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(` DELETE FROM categories WHERE user_id IS NULL`);
  pgm.dropColumn("categories", "type");
  pgm.alterColumn("categories", "user_id", {
    notNull: true,
  });
};
