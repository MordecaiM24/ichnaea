INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Tulane University', 'Tulane', 'tulane', 'New Orleans, LA', 'Urban', 110, 44, 9.6, 7780, 62844, 39749, 'Private', 1400, 1450, 1500, 31, 32, 33);
-- Deadline 1 for Tulane University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tulane University'), 'regularDecision', '2024-01-16T00:00:00.000Z', 'Regular Decision', '2024-02-16T00:00:00.000Z');
-- Deadline 2 for Tulane University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tulane University'), 'earlyAction', '2023-11-16T00:00:00.000Z', 'Early Action', '2023-12-16T00:00:00.000Z');
-- Deadline 3 for Tulane University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tulane University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision', '2023-11-16T00:00:00.000Z');
-- Deadline 4 for Tulane University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tulane University'), 'earlyDecision2', '2024-01-16T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for Tulane University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tulane University'), 'Describe why you are interested in joining the Tulane community. Consider your experiences, talents, and values to illustrate what you would contribute to the Tulane community if admitted. (250 words or less)', 250);
