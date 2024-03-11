INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Emory University', 'Emory', 'emory', 'Atlanta, GA', 'City', 631, 22, 13.1, 7130, 57948, 22597, 'Private', 1450, 1500, 1530, 32, 33, 34);
-- Deadline 1 for Emory University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'regularDecision', '2024-01-02T00:00:00.000Z', 'Regular Decision', '2024-02-01T00:00:00.000Z');
-- Deadline 2 for Emory University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-12-07T00:00:00.000Z');
-- Deadline 3 for Emory University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'earlyDecision2', '2024-01-02T00:00:00.000Z', 'Early Decision II', '2024-01-11T00:00:00.000Z');
-- Supplemental Essay 1 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'What academic areas are you interested in exploring at Emory University and why?', 0);
-- Supplemental Essay 2 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'Which book, character, song, monologue, or other creative work (fiction or non-fiction) seems made for you? Why?', 150);
-- Supplemental Essay 3 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'Reflect on a personal experience where you intentionally expanded your cultural awareness.', 150);
-- Supplemental Essay 4 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'Emory University aspires for all students to flourish on campus. Reflect on what flourishing at Emory means to you.', 150);
-- Supplemental Essay 5 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'Emory University''s core mission calls for service to humanity. Share how you might personally contribute to this mission.', 150);
-- Supplemental Essay 6 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'Emory University has a strong commitment to building community. Tell us about a community you have been part of where your participation helped to change or shape the community for the better.', 150);
-- Supplemental Essay 7 for Emory University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Emory University'), 'Reflection is a central tenet of Emory University''s values. Craft a personal email giving advice to yourself in your first year of high school.', 150);
