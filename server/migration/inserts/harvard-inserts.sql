INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Harvard University', 'Harvard', 'harvard', 'Cambridge, MA', 'Urban', 209, 3, 4, 7153, 57261, 13872, 'Private', 1480, 1530, 1580, 33, 35, 36);
-- Deadline 1 for Harvard University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'regularDecision', '2024-01-02T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for Harvard University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Restrictive Early Action', '2023-11-02T00:00:00.000Z');
-- Supplemental Essay 1 for Harvard University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'Harvard has long recognized the importance of enrolling a diverse student body. How will the life experiences that shape who you are today enable you to contribute to Harvard?', 200);
-- Supplemental Essay 2 for Harvard University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'Briefly describe an intellectual experience that was important to you.', 200);
-- Supplemental Essay 3 for Harvard University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'Briefly describe any of your extracurricular activities, employment experience, travel, or family responsibilities that have shaped who you are.', 200);
-- Supplemental Essay 4 for Harvard University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'How do you hope to use your Harvard education in the future?', 200);
-- Supplemental Essay 5 for Harvard University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Harvard University'), 'Top 3 things your roommates might like to know about you.', 200);
