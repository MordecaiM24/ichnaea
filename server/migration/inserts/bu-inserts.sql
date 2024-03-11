INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Boston University', 'BU', 'bu', 'Boston, MA', 'Urban', 140, 41, 18.6, 18229, 62360, 30395, 'Private', 1370, 1430, 1480, 31, 33, 34);
-- Deadline 1 for Boston University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Boston University'), 'regularDecision', '2024-01-05T00:00:00.000Z', 'Regular Admission', '2024-01-16T00:00:00.000Z');
-- Deadline 2 for Boston University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Boston University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision', '2023-11-02T00:00:00.000Z');
-- Deadline 3 for Boston University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Boston University'), 'earlyDecision2', '2024-01-05T00:00:00.000Z', 'Early Decision 2', '2024-01-05T00:00:00.000Z');
-- Supplemental Essay 1 for Boston University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Boston University'), '1. Reflect on a social or community issue that deeply resonates with you. Why is it important to you, and how have you been involved in addressing or raising awareness about it?', 300);
-- Supplemental Essay 2 for Boston University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Boston University'), '2. What about being a student at BU most excites you? How do you hope to contribute to our campus community?', 300);
