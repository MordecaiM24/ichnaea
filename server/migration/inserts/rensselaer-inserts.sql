INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Rensselaer Polytechnic Insitute', 'Rensselaer Polytechnic', 'rensselaer', 'Troy, NY', 'Suburban', 296, 51, 53, 5895, 61884, 31456, 'Private', 1380, 1440, 1500, 30, 33, 34);
-- Deadline 1 for Rensselaer Polytechnic Insitute
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rensselaer Polytechnic Insitute'), 'regularDecision', '2024-01-16T00:00:00.000Z', 'Regular Decision', '2024-02-01T00:00:00.000Z');
-- Deadline 2 for Rensselaer Polytechnic Insitute
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rensselaer Polytechnic Insitute'), 'earlyAction', '2023-12-02T00:00:00.000Z', 'Early Action', '2023-12-16T00:00:00.000Z');
-- Deadline 3 for Rensselaer Polytechnic Insitute
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rensselaer Polytechnic Insitute'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-02T00:00:00.000Z');
-- Deadline 4 for Rensselaer Polytechnic Insitute
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rensselaer Polytechnic Insitute'), 'earlyDecision2', '2023-12-16T00:00:00.000Z', 'Early Decision II', '2023-12-16T00:00:00.000Z');
-- Supplemental Essay 1 for Rensselaer Polytechnic Insitute
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rensselaer Polytechnic Insitute'), 'Why are you interested in Rensselaer Polytechnic Institute?', 250);
