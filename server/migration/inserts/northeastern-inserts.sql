INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Northeastern University', 'Northeastern', 'northeastern', 'Boston, MA', 'Urban', 73, 44, 18.4, 15747, 60192, 29714, 'Private', 1450, 1500, 1535, 33, 34, 35);
-- Deadline 1 for Northeastern University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Northeastern University'), 'regularDecision', '2024-01-02T00:00:00.000Z', 'Regular Decision', '2024-02-16T00:00:00.000Z');
-- Deadline 2 for Northeastern University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Northeastern University'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2023-12-02T00:00:00.000Z');
-- Deadline 3 for Northeastern University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Northeastern University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 4 for Northeastern University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Northeastern University'), 'earlyDecision2', '2024-01-02T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for Northeastern University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Northeastern University'), 'Northeastern does not have supplemental essays', 0);
