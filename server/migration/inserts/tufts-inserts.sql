INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Tufts University', 'Tufts', 'tufts', 'Medford, MA', 'Suburban', 150, 32, 11.4, 6676, 65222, 37494, 'Private', 1460, 1500, 1540, 33, 34, 35);
-- Deadline 1 for Tufts University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), 'regularDecision', '2024-01-05T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for Tufts University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 3 for Tufts University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), 'earlyDecision2', '2024-01-05T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for Tufts University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), 'It’s cool to love learning. What excites your intellectual curiosity and why?', 250);
-- Supplemental Essay 2 for Tufts University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), 'How have the environments or experiences of your upbringing – your family, home, neighborhood, or community – shaped the person you are today?', 250);
-- Supplemental Essay 3 for Tufts University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), 'Using a specific example or two, tell us about a way that you contributed to building a collaborative and/or inclusive community.', 250);
-- Supplemental Essay 4 for Tufts University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Tufts University'), '“I am applying to Tufts because…”  (100 words or less)', 100);
